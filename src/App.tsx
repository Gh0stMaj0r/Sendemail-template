import { useRef, useEffect, useState} from 'react';
import './App.css';
import emailjs from '@emailjs/browser'
import { FormEvent } from 'react';

export default function App() {
  const [loading, setLoading] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailjs.init("Wri1mQvAtFAIlf2YB")
  }, []);

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
    sendEmail();
  }

  const sendEmail = async () => {
    const serviceId = "service_ej2kefj"
    const templateId = "template_n7uofxf"

    try {
      setLoading(true);
      const emailValue = emailRef.current ? emailRef.current.value: '';
      await emailjs.send(serviceId, templateId, {
        name: nameRef.current?.value,
        recipient: emailValue
      });
      alert("email succesfully sent check inbox");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <aside></aside>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form_group'>
          <label htmlFor=''>name</label>
          <input ref={nameRef} placeholder='enter your name'/>
        </div>
        <div className='form_group'>
          <label htmlFor=''>email</label>
          <input ref={emailRef} placeholder='enter your email'/>
        </div>
        <button className='btn' disabled={loading}>
          subscribe
        </button>
      </form>
    </section>
  );
}
