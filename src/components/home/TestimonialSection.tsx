
const testimonials = [
  {
    content: "Donating through Lifeline was so easy. I received notifications when my blood helped save someone's life, which was incredibly rewarding.",
    author: "Emily Johnson",
    role: "Regular Donor"
  },
  {
    content: "When my daughter needed urgent blood after an accident, Lifeline connected us with donors within minutes. I'm eternally grateful.",
    author: "Michael Chen",
    role: "Blood Recipient"
  },
  {
    content: "As a healthcare professional, I appreciate how Lifeline streamlines the blood donation process and helps us maintain adequate supplies for emergencies.",
    author: "Dr. Sarah Williams",
    role: "Hospital Administrator"
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Hear from our community
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Stories from donors and recipients who have used our platform
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-8 lg:grid-cols-3 lg:max-w-none">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className="text-blood-red">
                      {/* Quote icon */}
                      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                    </div>
                    <p className="mt-3 text-base text-gray-500">
                      {testimonial.content}
                    </p>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blood-red to-blood-redLight flex items-center justify-center text-white font-bold">
                          {testimonial.author.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
