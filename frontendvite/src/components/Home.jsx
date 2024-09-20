import React from 'react';

const Home = () => {

 
    return(
        <div className=''>
            <section className='banner -z-50 relative flex flex-col justify-center
            items-center'>

                <div className='w-[50vw] z-10 text-center'>
                    <p className='text-2xl lg:text-6xl z-10 py-5 text-white'><span className="big">Big</span>Bites</p>
                    <p className='z-10 text-300 text-xl lg:text-1xl text-white'>Where Quality Flavor Meets Fast.</p>

                    <button className='bgcolor-black'>Find Your Next Meal</button>

                </div>
                <div className='cover absolute top-0 left-0 right-0'>

                </div>
                <div className='fadeout'>

                </div>

            </section>

        </div>
    )

}

export default Home;