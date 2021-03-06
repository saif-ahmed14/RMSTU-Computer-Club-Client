import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const AddStudents = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        //alert set
        Swal.fire({
            title: `Are you sure to add ${data.name} profile!!!`,
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                //pass data in backend
                axios.post('https://fast-fortress-28219.herokuapp.com/add-student', data)
                    .then(result => {
                        console.log(result);
                        if (result?.data?.insertedId) {
                            Swal.fire('Student! added', '', 'success')
                            reset();
                        } else {
                            Swal.fire(`${result?.data?.message}`, '', 'info')
                        }
                    })
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }
    return (
        <div className='row event-container d-flex justify-content-center align-items-center py-5'>
            <h2 className='text-center'>Add Student Profile</h2>

            <div className="col-md-7">
                <div className="event-form p-0 text-start">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p className='justify-content-start'>Name</p>
                        <input type="text" {...register("name", { required: true })} placeholder="Student Name" />

                        <p className='justify-content-start'>Batch</p>
                        <input type="number" {...register("batch")} placeholder="1" />

                        <p className='d-flex justify-content-start'>Email</p>
                        <input type="email" {...register("email", { required: true })} placeholder="Email" />

                        <p className='d-flex justify-content-start'>Photo</p>
                        <input type="text" {...register("photoURL", { required: true })} placeholder="Photo link" />

                        <p className='d-flex justify-content-start'>session</p>
                        <input type="text" {...register("session")} maxLength={9} placeholder="2020-2021" />

                        <input className="rounded-2 p-1 border-0 fs-4" type="submit" id='submit-btn' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddStudents;