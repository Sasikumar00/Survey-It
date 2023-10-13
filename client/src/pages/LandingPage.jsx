import React from 'react'
import { Link } from 'react-router-dom'
import LoginButton from './LoginButton'
import { useAuth } from '../context/authContext';
import Footer from '../components/Footer';

const LandingPage = () => {
    const {auth} = useAuth();
  return (
    <div>
        <section className="hero h-[40vh]">
            <div className="hero-content flex flex-col items-center justify-center h-full">
                <h1 className='text-5xl my-5'>Welcome to Pivony</h1>
                <p>Your Solution for Customized Popups</p>
                {!auth ?
                <div>
                    <LoginButton/>
                </div>
                :
                <Link className='bg-yellow-400 px-2 py-1 rounded-md mt-5' to={'/dashboard'}>Get Started</Link>
                }
            </div>
        </section>
        <section id="features" className="features px-5">
            <div className='flex items-center justify-center my-5'>
                <hr className='w-[60%]'/>
            </div>
            <h2 className='text-4xl text-center'>Key Features</h2>
            <div className='flex flex-col items-center'>
            <div className='grid grid-cols-2 gap-4 mt-5'>
            <div className="feature-item border border-slate-600 flex flex-col items-center justify-center px-5 py-2 rounded-md">
                <img src="/custom_popuo.png" alt="Feature 1 Icon" className='w-[27.5rem]'/>
                <h3 className='text-3xl'>Custom Designs</h3>
                <p>Create popups with custom designs to match your brand.</p>
            </div>
            <div className="feature-item border border-slate-600 flex flex-col items-center justify-center px-5 py-2 rounded-md">
                <img src="/target_messaging.jpg" alt="Feature 2 Icon" className='w-[30rem]'/>
                <h3 className='text-3xl'>Targeted Messaging</h3>
                <p>Deliver personalized messages to your audience.</p>
            </div>
            </div>
            <div className="feature-item border border-slate-600 flex flex-col items-center justify-center px-5 py-2 mt-4 rounded-md">
                <img src="/easy_integration.jpg" alt="Feature 3 Icon" className='w-[30rem]'/>
                <h3 className='text-3xl'>Easy Integration</h3>
                <p>Seamlessly integrate popups into your website or app.</p>
            </div>
            </div>
        </section>
        <section id="about" className="about flex flex-col items-center justify-center px-16 py-10">
            <h2 className='text-4xl text-center mb-5'>About Us</h2>
            <p className='text-xl'>At Pivony, we are passionate about providing you with the best popup solutions to engage your website visitors and boost conversions. With our customizable popups, you can create engaging user experiences and drive results. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis qui itaque aut tempora nihil deleniti nobis soluta rem eveniet animi aliquam accusamus, quo voluptatibus amet alias sint minima dolore iste voluptates facere voluptatem molestias hic dolores! Perferendis, repudiandae explicabo. Error earum, totam vitae a numquam doloribus blanditiis velit quaerat saepe temporibus accusantium facere, perspiciatis magnam! Perferendis nostrum ullam non temporibus illum ducimus quibusdam aut neque. Fugiat incidunt nemo repellat soluta quis dolorem quo hic provident voluptates magnam molestiae, reprehenderit expedita odio necessitatibus voluptas rerum alias explicabo neque. Eos rem iusto nemo officia voluptas tempore assumenda, nulla nesciunt error similique earum. Atque corporis tempora rem, pariatur laudantium est praesentium maxime exercitationem adipisci quam nulla, modi facere assumenda qui animi odio. Vero adipisci nam deserunt quidem maiores reiciendis eaque corporis eum incidunt debitis, beatae error temporibus, nostrum, dolore fuga ipsam. Vero odio expedita temporibus neque perspiciatis labore quibusdam aliquam tempore alias accusamus blanditiis iure voluptatum commodi doloribus assumenda tenetur placeat excepturi ratione impedit amet quas, voluptatibus cumque! Iste, tempora voluptatem! Error veritatis, rerum aut explicabo odio incidunt vel repudiandae saepe id! Ratione explicabo rem totam eaque ipsum sit quas quisquam, quam ducimus dicta mollitia, numquam nobis? Minus excepturi veritatis illum quaerat illo!</p>
        </section>
        <section id="contact" className="contact flex flex-col items-center mb-10">
            <div className='flex items-center justify-center my-10'>
                <hr className='w-[60%] bg-black'/>
            </div>
            <h2 className='text-4xl text-center'>Contact Us</h2>
            <p className='text-xl text-center'>Have questions or ready to get started? Contact us today!</p>
            <form className='flex flex-col items-center w-[100%]'>
                <label htmlFor="name" className='text-xl flex flex-col w-[50%] my-3'>Name:
                <input type="text" id="name" name="name" required className='border border-black outline-none rounded-md'/>
                </label>
                <label htmlFor="email" className='text-xl flex flex-col w-[50%] my-3'>Email:
                <input type="email" id="email" name="email" required className='border border-black outline-none rounded-md'/>
                </label>
                <label htmlFor="message" className='text-xl  flex flex-col w-[50%] my-3'>Message:
                <textarea id="message" name="message" required className='border border-black outline-none rounded-md'/>
                </label>
                <button type="submit" className="cta-button bg-yellow-400 rounded-md w-[20%] py-2">Send Message</button>
            </form>
        </section >
        <Footer/>
        </div>
  )
}

export default LandingPage