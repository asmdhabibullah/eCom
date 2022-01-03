import Header from "../components/Header";
import { Formik, Form, Field } from 'formik';
import PreLoader from "../../helper/Loder";
import { useState } from "react";
import { config } from "../../helper/config";

export default function Registration() {

    const [submitting, setSubmitting] = useState(false);

    // Synchronous validation function
    const validate = value => {
        let errorMessage;
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            errorMessage = 'Invalid email address';
        }
        return errorMessage;
    };

    // Async validation function
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const validateAsync = value => {
        return sleep(2000).then(() => {
            if (['admin', 'null', 'god'].includes(value)) {
                return 'Nice try';
            }
        });
    };

    const handleSubmit = async (values, other) => {

        setSubmitting(true);

        console.log(config.API);

        const res = await fetch(`${config.API}/api/user/signup`, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" }
        })

        if (res) {
            console.log(res);
            console.log("JSON.stringify(values, null, 2)", JSON.stringify(values, null, 2));
        }
        other.resetForm();
    }

    return (
        <div className="bg-gray-100">
            <Header />
            <main className="max-w-md mx-auto">
                <Formik
                    initialValues={{ name: '', email: '', username: '', password: '' }}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <ul className="divide-y divide-gray-200 py-4 ">
                                <li className="py-4 flex">
                                    <label>Full name: </label>{" "}
                                    <Field validate={validateAsync} name="name" type="text" />
                                    {errors.name && touched.name ? (
                                        <div>{errors.name}</div>
                                    ) : null}
                                </li>
                                <li className="py-4 flex">
                                    <label>Email address: </label>{" "}
                                    <Field validate={validate} name="email" type="email" />
                                    {errors.email && touched.email ? <div>{errors.email}</div> : null}
                                </li>
                                <li className="py-4 flex">
                                    <label>Username: </label>{" "}
                                    <Field validate={validateAsync} name="username" type="text" />
                                    {errors.username && touched.username ? (
                                        <div>{errors.username}</div>
                                    ) : null}
                                </li>
                                <li className="py-4 flex">
                                    <label>Password: </label>{" "}
                                    <Field validate={validateAsync} name="password" type="password" />
                                    {errors.password && touched.password ? (
                                        <div>{errors.password}</div>
                                    ) : null}

                                </li>
                            </ul>
                            <button className="bg-gray-500 rounded-none" type="submit">Register</button>
                            {/* <button class="rounded-full">Save Changes</button> */}
                        </Form>
                    )}
                </Formik>
            </main>
        </div >
    )
}