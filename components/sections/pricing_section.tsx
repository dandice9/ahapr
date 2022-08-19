import { Component, ReactNode } from "react";

class PricingSection extends Component{
    render(): ReactNode {
        return (<section
            id="pricing"
            className="relative z-20 overflow-hidden bg-white pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]"
          >
            <div className="container mx-auto">
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4">
                  <div className="mx-auto mb-[60px] max-w-[620px] text-center lg:mb-20">
                    <span className="mb-2 block text-lg font-semibold text-blue-500">
                      Pricing Table
                    </span>
                    <h2
                      className="mb-4 text-3xl font-bold text-black sm:text-4xl md:text-[40px]"
                    >
                      Our Pricing Plan
                    </h2>
                    <p
                      className="text-lg leading-relaxed text-body-color sm:text-xl sm:leading-relaxed"
                    >
                      There are many variations of passages of Lorem Ipsum available
                      but the majority have suffered alteration in some form.
                    </p>
                  </div>
                </div>
              </div>
      
              <div className="flex flex-wrap items-center justify-center">
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <div
                    className="wow fadeInUp relative z-10 mb-10 overflow-hidden rounded-xl border border-blue-500 border-opacity-20 bg-white py-10 px-8 text-center shadow-pricing sm:p-12 lg:py-10 lg:px-6 xl:p-12"
                    data-wow-delay=".15s
                    "
                  >
                    <span
                      className="mb-2 block text-base font-medium uppercase text-black"
                    >
                      STARTING FROM
                    </span>
                    <h2 className="mb-9 text-[28px] font-semibold text-blue-500">
                      $ 19.99/mo
                    </h2>
      
                    <div className="mb-10">
                      <p
                        className="mb-1 text-base font-medium leading-loose text-body-color"
                      >
                        1 User
                      </p>
                      <p
                        className="mb-1 text-base font-medium leading-loose text-body-color"
                      >
                        All UI components
                      </p>
                      <p
                        className="mb-1 text-base font-medium leading-loose text-body-color"
                      >
                        Lifetime access
                      </p>
                      <p
                        className="mb-1 text-base font-medium leading-loose text-body-color"
                      >
                        Free updates
                      </p>
                      <p
                        className="mb-1 text-base font-medium leading-loose text-body-color"
                      >
                        Use on 1 (one) project
                      </p>
                      <p
                        className="mb-1 text-base font-medium leading-loose text-body-color"
                      >
                        3 Months support
                      </p>
                    </div>
                    <div className="w-full">
                      <a
                        href=""
                        className="inline-block rounded-full border border-[#D4DEFF] bg-transparent py-4 px-11 text-center text-base font-medium text-blue-500 transition duration-300 ease-in-out hover:border-blue-500 hover:bg-blue-500 hover:text-white"
                      >
                        Purchase Now
                      </a>
                    </div>
                    <span
                      className="absolute left-0 bottom-0 z-[-1] block h-14 w-14 rounded-tr-full bg-blue-500"
                    >
                    </span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <div
                    className="wow fadeInUp relative z-10 mb-10 overflow-hidden rounded-xl bg-blue-500 bg-gradient-to-b from-blue-500 to-[#179BEE] py-10 px-8 text-center shadow-pricing sm:p-12 lg:py-10 lg:px-6 xl:p-12"
                    data-wow-delay=".1s
                    "
                  >
                    <span
                      className="mb-5 inline-block rounded-full border border-white bg-white py-2 px-6 text-base font-semibold uppercase text-blue-500"
                    >
                      POPULAR
                    </span>
                    <span
                      className="mb-2 block text-base font-medium uppercase text-white"
                    >
                      STARTING FROM
                    </span>
                    <h2 className="mb-9 text-[28px] font-semibold text-white">
                      $ 19.99/mo
                    </h2>
      
                    <div className="mb-10">
                      <p className="mb-1 text-base font-medium leading-loose text-white">
                        5 User
                      </p>
                      <p className="mb-1 text-base font-medium leading-loose text-white">
                        All UI components
                      </p>
                      <p className="mb-1 text-base font-medium leading-loose text-white">
                        Lifetime access
                      </p>
                      <p className="mb-1 text-base font-medium leading-loose text-white">
                        Free updates
                      </p>
                      <p className="mb-1 text-base font-medium leading-loose text-white">
                        Use on 1 (one) project
                      </p>
                      <p className="mb-1 text-base font-medium leading-loose text-white">
                        4 Months support
                      </p>
                    </div>
                    <div className="w-full">
                      <a
                        href=""
                        className="inline-block rounded-full border border-white bg-white py-4 px-11 text-center text-base font-medium text-black transition duration-300 ease-in-out hover:border-black hover:bg-black hover:text-white"
                      >
                        Purchase Now
                      </a>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <div
                    className="wow fadeInUp relative z-10 mb-10 overflow-hidden rounded-xl border border-blue-500 border-opacity-20 bg-white py-10 px-8 text-center shadow-pricing sm:p-12 lg:py-10 lg:px-6 xl:p-12"
                    data-wow-delay=".15s
                    "
                  >
                    <span
                      className="mb-2 block text-base font-medium uppercase text-black"
                    >
                      STARTING FROM
                    </span>
                    <h2 className="mb-9 text-[28px] font-semibold text-blue-500">
                      $ 70.99/mo
                    </h2>
      
                    <div className="mb-10">
                      <p
                        className="mb-1 text-base font-medium leading-loose text-body-color"
                      >
                        1 User
                      </p>
                      <p
                        className="mb-1 text-base font-medium leading-loose text-body-color"
                      >
                        All UI components
                      </p>
                      <p
                        className="mb-1 text-base font-medium leading-loose text-body-color"
                      >
                        Lifetime access
                      </p>
                      <p
                        className="mb-1 text-base font-medium leading-loose text-body-color"
                      >
                        Free updates
                      </p>
                      <p
                        className="mb-1 text-base font-medium leading-loose text-body-color"
                      >
                        Use on unlimited project
                      </p>
                      <p
                        className="mb-1 text-base font-medium leading-loose text-body-color"
                      >
                        4 Months support
                      </p>
                    </div>
                    <div className="w-full">
                      <a
                        href=""
                        className="inline-block rounded-full border border-[#D4DEFF] bg-transparent py-4 px-11 text-center text-base font-medium text-blue-500 transition duration-300 ease-in-out hover:border-blue-500 hover:bg-blue-500 hover:text-white"
                      >
                        Purchase Now
                      </a>
                    </div>
      
                    <span
                      className="absolute right-0 top-0 z-[-1] block h-14 w-14 rounded-bl-full bg-secondary"
                    >
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>)
    }
}

export default PricingSection