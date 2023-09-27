import {getDocs ,collection, query, where} from "firebase/firestore"
import { db } from "./config/Firebase";
export  async function fetchItems(){

  try {
    const moviesCollectionRef = collection(db, "customers");
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return filteredData
      
    } catch (err) {
      console.error(err);
    }
  

    
      
    
}
export async function fetchData(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();
return data
}

export function formatPrice(price) {
  // Convert the price to a number if it's not already
  const numericPrice = Number(price);

  // Use the toLocaleString() method to format the price with commas and decimal places
  return numericPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
export async function getAddress({ latitude, longitude }) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}

export async function fetchAddress () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in.
    // Payload of the FULFILLED state
    return { position, address}
}
export async function fetchFilteredItems(search) {
  try {
    const customersCollectionRef = collection(db, "customers");
    const q = query(customersCollectionRef, where("name", "==", search));
    const data = await getDocs(q);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return filteredData;
  } catch (err) {
    console.error(err);
  }
}