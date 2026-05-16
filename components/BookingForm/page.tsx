'use client';

import { Formik, Form, Field } from 'formik';
import toast from 'react-hot-toast';
import { bookCar } from '@/services/carsApi';
import css from './page.module.css';

export default function BookingForm({ carId }: { carId: string }) {
  return (
    <section className={css.formContainer}>
      <div className={css.formHeader}>
        <h2 className={css.formtitle}>Book your car now</h2>
        <p className={css.formtitletext}>Stay connected! We are always ready to help you.</p>
      </div>

      <Formik
        initialValues={{
          name: '',
          email: '',
          date: '',
          message: '',
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const payload = {
              name: values.name,
              email: values.email,
              comment: values.message,
            };
            await bookCar(carId, payload);

            toast.success('Booking request for Buick Enclave accepted.');
            setTimeout(() => {
              toast('We will contact you later!', {
                icon: '📞',
              });
            }, 2500);
            resetForm();
          } catch (error) {
            console.error('Booking error:', error);
            toast.error('Failed to send booking request. Please try again.');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={css.bookingForm}>
            <div className={css.inputsContainer}>
              <div className={css.inputWrapper}>
                <label htmlFor="name"></label>
                <Field type="text" id="name" name="name" placeholder="Name*" autoComplete="name" required />
              </div>

              <div className={css.inputWrapper}>
                <label htmlFor="email"></label>
                <Field type="email" id="email" name="email" placeholder="Email*" autoComplete="email" required />
              </div>

              <div className={css.commentWrapper}>
                <label htmlFor="message"></label>
                <Field as="textarea" id="message" name="message" placeholder="Comment" autoComplete="comment" required />
              </div>
            </div>

            <button type="submit" className={css.sendingButton} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
