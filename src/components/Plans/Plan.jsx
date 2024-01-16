import { addDoc, 
    collection, 
    getDocs, 
    onSnapshot, 
    query, 
    where } from 'firebase/firestore';
import db from '../../firebaseconfig';
import './Plans.css'
import React,{useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';
import Loader from '../Loader/Loader';

const Plan = () => {
    const [products,setProducts] = useState([])
    const user = useSelector(selectUser)
    const [subscription,setSubscription] = useState(null)
    const [isLoading,setLoading] = useState(true)
    //fetch subscription details
    useEffect(() => {
        const fetchSubscription =async () => {
            const subsQuery = query(collection(db,"customers",user.uid,"subscriptions"))

            const subsSnapshot = await getDocs(subsQuery)

            subsSnapshot.forEach( async (doc) => {
           
                setSubscription({
                    role: doc.data().role,
                    start: doc.data().current_period_start.seconds,
                    end: doc.data().current_period_end.seconds,
                })
            })
            
        }
        fetchSubscription()
    },[user.uid])
    //fetch plan details
    useEffect(() => {
       const fetchProducts = async () => {
        //Firebase query to fetch the prodcuts that are active
            const q = query(collection(db,'products'),where('active','==',true))
            const productSnapshot = await getDocs(q)
            //Iterating the products 
            const tempProducts = []
            productSnapshot.forEach(async (snapshot) => {
                // console.log('Product Snapshot',snapshot)
                    tempProducts[snapshot.id] = snapshot.data()
                    tempProducts[snapshot.id].id = snapshot.id
                    //Query to retrieve prices data
                    const priceQuery = collection(snapshot.ref,"prices")
                    const pricesSnapshot = await getDocs(priceQuery)
                    // console.log('Price Snapshot',pricesSnapshot)
                    pricesSnapshot.forEach(async (priceSnapshot) => {
                        tempProducts[snapshot.id].prices = {
                            priceId: priceSnapshot.id,
                            price: priceSnapshot.data()
                        }
                    } )

            })
            setProducts(tempProducts)
            setLoading(false)
            
        }
        fetchProducts()
        
       
    
    },[])

    const handleSubscribe = async (priceid) => {
        //Query to add subscription detail to customer collection

        const docRef = await addDoc(
            collection(db, "customers", user.uid, "checkout_sessions"),
            {
              price: priceid,
              success_url: window.location.origin,
              cancel_url: window.location.origin,
            }
          );
        //Listens to realtime changes made in the firebase
        //that is the changes made in 
          onSnapshot(docRef, async (snapshot) => {
            // console.log("Payment",snapshot)
            const { error, sessionId } = snapshot.data();
      
            if (error) {
              alert(`An error occurred: ${error.message}`);
            }
            if (sessionId) {
                
              const stripe = await loadStripe(
                "<STRIPE_KEY>"
              );
              stripe.redirectToCheckout({ sessionId });
              
            }
          });
          
      
    }
    if(isLoading) {
        return (<Loader />)
    }
    return (
        <div className="plans">
            
            {subscription && 
            <p>Renewal Date: 
                <span>{` ${new Date(subscription?.end*1000).toLocaleDateString()}`}</span>
            
            </p>
        }

            {
                Object.entries(products).map( ([prodKey,prodValue]) => {
                    
                    //Check for current subscription
                    const isCurPkg = prodValue?.name.split(' ')[0]
                    .toLowerCase()
                    .includes(subscription?.role.toLowerCase())
                    
                    return (
                        <div className="plan" key={prodValue.id}>
                            <div className="plan__info">
                                <h4>{prodValue.name}</h4>
                                <p>{prodValue.description}</p>
                            </div>
                            <button 
                            onClick={() => !isCurPkg && handleSubscribe(prodValue.prices.priceId)}
                            className={isCurPkg ? 'active':undefined}
                            >
                                {isCurPkg? 'Current Plan':'Subscribe'}
                                </button>
                        </div>
                    )
                })
            }

        </div>
    )
}
export default Plan;