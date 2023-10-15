import React, { useState, useEffect } from 'react';
import API from '../api/axios.config';
import { useUserContext } from '../contexts/userContext';

const Expert = () => {
    const { userData } = useUserContext();
    const [bookings, setBookings] = useState([]);
    const [accepted, setAccepted] = useState([]);

    useEffect(() => {
        // Fetch booking data from the backend
        API.get('/bookings') // Replace '/bookings' with the actual API endpoint
            .then((response) => {
                console.log(response.data);
                setBookings(() => [...response.data.bookings]);
            })
            .catch((error) => {
                console.error('Error fetching bookings: ', error);
            });

    }, []);

    useEffect(() => {
        if (userData && userData.user_id) {

            API.post('/accepted', { id: userData.user_id })
                .then((response) => {
                    console.log(response.data);
                    setAccepted(() => [...response.data.bookings]);
                })
                .catch((error) => {
                    console.error('Error fetching bookings: ', error);
                });
        }
    }, [userData])

    return (
        <div className="mt-24">
            <div>
                <h1 className='text-xl font-bold mb-2 ml-4'>
                    Avilable Tuitions
                </h1>
            </div>
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-600">
                        <th className="px-4 py-2">Subject</th>
                        <th className="px-4 py-2">Duration</th>
                        <th className="px-4 py-2">Chapter</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Time</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings &&
                        bookings.map((booking) => {
                            // Format the date and time
                            const formattedDate = new Date(booking.selecteddate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                            });


                            return (
                                <tr key={booking.id} className="bg-gray-500 border-b">
                                    <td className="px-4 py-2 text-center">{booking.subject}</td>
                                    <td className="px-4 py-2 text-center">{`${booking.duration} hours`}</td>
                                    <td className="px-4 py-2 text-center">{booking.chapter}</td>

                                    <td className="px-4 py-2 text-center">{formattedDate}</td>
                                    <td className="px-4 py-2 text-center">{booking.selectedtime}</td>
                                    <td className="px-4 py-2 text-center">
                                        <button className="bg-green-500 hover-bg-green-600 text-white px-2 py-1 mr-2"
                                            onClick={() => {
                                                API.post('/accept', { book_id: booking.id, expert_id: userData.user_id })
                                                    .then((response) => {
                                                        console.log(response.data);

                                                    })
                                                    .catch((error) => {
                                                        console.error('Error fetching bookings: ', error);
                                                    });
                                            }}>
                                            Accept
                                        </button>

                                    </td>
                                </tr>

                            );
                        })}

                </tbody>
            </table>


            <div>
                <h1 className='text-xl font-bold mb-2 ml-4 mt-5'>
                    Accepted Tuitions
                </h1>
            </div>
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-600">
                        <th className="px-4 py-2">Subject</th>
                        <th className="px-4 py-2">Duration</th>
                        <th className="px-4 py-2">Chapter</th>
                        <th className="px-4 py-2">Social Media</th>
                        <th className="px-4 py-2">Phone Number</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Time</th>
                        <th className="px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {accepted &&
                        accepted.map((booking) => {
                            // Format the date and time
                            const formattedDate = new Date(booking.selecteddate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                            });


                            return (
                                <tr key={booking.id} className="bg-gray-500 border-b">
                                    <td className="px-4 py-2 text-center">{booking.subject}</td>
                                    <td className="px-4 py-2 text-center">{`${booking.duration} hours`}</td>
                                    <td className="px-4 py-2 text-center">{booking.chapter}</td>
                                    <td className="px-4 py-2 text-center">{booking.socialmedia}</td>
                                    <td className="px-4 py-2 text-center">{booking.number}</td>
                                    <td className="px-4 py-2 text-center">{formattedDate}</td>
                                    <td className="px-4 py-2 text-center">{booking.selectedtime}</td>
                                    <td className="px-4 py-2 text-center">
                                        {booking.paid ? "Paid" : "Not Paid"}
                                    </td>
                                </tr>

                            );
                        })}

                </tbody>
            </table>
        </div>

    );
};

export default Expert;
