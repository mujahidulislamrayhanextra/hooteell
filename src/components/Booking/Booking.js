import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Booking = () => {
    const [bookings,setBookings] = useState([]);
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
  

    useEffect(() => {
            fetch('http://localhost:5000/booking?email=' + loggedInUser.email,{
                method : 'GET',
                headers : {'Content-Type': 'application/json',
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            }
            })
            .then( res => res.json())
            .then(data => {
                setBookings(data);
                console.log(data);
                console.log(bookings);
            })
    },[])
 
    return (
        <div>
            
            <h3>You Have: {bookings.length} Bookings</h3>

            {
                bookings.map(book => <li>{book.name} from: {(new Date (book.checkIn).toDateString('dd/MM/yyyy'))} to: {(new Date (book.checkOut).toDateString('dd/MM/yyyy'))}</li>)
                
            }
            
        </div>
    );
};

export default Booking;