import React, { useState, useEffect } from 'react';
import { CloudUpload } from "@mui/icons-material";
import DatePicker from "react-datepicker"; // Date picker
import TimePicker from "react-time-picker"; // Time picker
import "react-datepicker/dist/react-datepicker.css"; // Date picker CSS
import { useClassroomContext } from '../contexts/classroomContext';
import { useUserContext } from '../contexts/userContext';
import axios from 'axios';
import API from '../api/axios.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Help = () => {
    const [number, setNumber] = useState("");
    const [socialMedia, setSocialMedia] = useState("");
    const [duration, setDuration] = useState("");
    const [subject, setSubject] = useState("");
    const [chapter, setChapter] = useState("");
    const [selectedDate, setSelectedDate] = useState(null); // Selected date
    const [selectedTime, setSelectedTime] = useState("12:00"); // Selected time
    const { classList, focusedClass, setFocusedClass } = useClassroomContext();
    const { userData } = useUserContext();

    const [accepted, setAccepted] = useState([]);

    useEffect(() => {
        if (userData && userData.user_id) {

            API.post('/mybookings', { student_id: userData.user_id })
                .then((response) => {
                    console.log(response.data);
                    setAccepted(() => [...response.data.bookings]);
                })
                .catch((error) => {
                    console.error('Error fetching bookings: ', error);
                });
        }
    }, [userData])

    const sendBook = () => {
        API.post("/bookexpert", { number, socialMedia, duration, subject, chapter, selectedDate, selectedTime, student_id: userData.user_id })
            .then((res) => {
                if (res.status === 201) {
                    toast.success("Booking is done!", {
                        position: "top-right",
                        autoClose: 3000, // Adjust as needed
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    }); F
                }
            })
            .catch(function (error) {

            });
    };

    return (
        <div>
            <div className="mt-24 flex justify-center">
                <div className="w-[600px] overflow-hidden shadow-lg bg-gray-700 text-white p-4 rounded-lg mb-2">
                    <div className="flex flex-col items-center justify-between">
                        <h1 className='text-xl mb-2'>
                            Book an expert?
                        </h1>
                        <input
                            className="w-full mb-2 rounded-lg bg-gray-600 text-white border-2 p-2 border-dotted focus:outline-none focus:border-gray-500 font-bold font-dancing-script"
                            placeholder="Phone Number"
                            onChange={(e) => setNumber(e.target.value)}
                        />
                        <input
                            className="w-full mb-2 rounded-lg bg-gray-600 text-white border-2 p-2 border-dotted focus:outline-none focus:border-gray-500 font-bold font-dancing-script"
                            placeholder="Social Media"
                            onChange={(e) => setSocialMedia(e.target.value)}
                        />
                        <input
                            className="w-full mb-2 rounded-lg bg-gray-600 text-white border-2 p-2 border-dotted focus:outline-none focus:border-gray-500 font-bold font-dancing-script"
                            placeholder="Duration in hour"
                            onChange={(e) => setDuration(e.target.value)}
                        />
                        <input
                            className="w-full mb-2 rounded-lg bg-gray-600 text-white border-2 p-2 border-dotted focus:outline-none focus:border-gray-500 font-bold font-dancing-script"
                            placeholder="Subject"
                            onChange={(e) => setSubject(e.target.value)}
                        />
                        <input
                            className="w-full mb-2 rounded-lg bg-gray-600 text-white border-2 p-2 border-dotted focus:outline-none focus:border-gray-500 font-bold font-dancing-script"
                            placeholder="Chapter"
                            onChange={(e) => setChapter(e.target.value)}
                        />

                        <div className="flex w-full mb-2 space-x-2">
                            <div className="w-1/2">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={date => setSelectedDate(date)}
                                    className="bg-gray-600 w-full p-2 border-2 rounded-lg border-dotted text-white focus:outline-none"
                                />
                            </div>
                            <div className="w-1/2">
                                <input
                                    className="w-full mb-2 rounded-lg bg-gray-600 text-white border-2 p-2 border-dotted focus:outline-none focus:border-gray-500 font-bold font-dancing-script"
                                    placeholder="Initial time"
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                />
                            </div>
                        </div>

                        <button className='mt-2 rounded-lg p-2 bg-green-600 w-full' onClick={sendBook}>
                            Book
                        </button>
                    </div>
                </div>
                <ToastContainer />
            </div>


            <table className="min-w-full table-auto mt-5">
                <thead>
                    <tr className="bg-gray-600">
                        <th className="px-4 py-2">Subject</th>
                        <th className="px-4 py-2">Duration</th>
                        <th className="px-4 py-2">Chapter</th>
                        <th className="px-4 py-2">Social Media</th>
                        <th className="px-4 py-2">Phone Number</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Time</th>
                        <th className="px-4 py-2">Action</th>
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
                                        {booking.paid ? <>Paid</> :
                                            booking.available ? <>In progress</> :
                                                <button className="bg-green-500 hover-bg-green-600 text-white px-2 py-1 mr-2"
                                                    onClick={() => {
                                                        API.post('/pay', { book_id: booking.id })
                                                            .then((response) => {
                                                                console.log(response.data);

                                                            })
                                                            .catch((error) => {
                                                                console.error('Error fetching bookings: ', error);
                                                            });
                                                    }}>
                                                    Pay Now
                                                </button>
                                        }
                                    </td>
                                </tr>

                            );
                        })}

                </tbody>
            </table>

        </div>
    );
}

export default Help;
