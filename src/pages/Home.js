/* eslint-disable jsx-a11y/no-redundant-roles */
import Footer from "../components/shop/Footer";
import HomeHeader from "../components/Home/HomeHeader.jsx";
export default function Home() {
  return (
    <>
      <HomeHeader />
      <div className="relative overflow-hidden bg-white py-16">
        <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full lg:[overflow-anchor:none]">
          <div
            className="relative mx-auto h-full max-w-prose text-lg"
            aria-hidden="true"
          >
            <svg
              className="absolute top-12 left-full translate-x-32 transform"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
              />
            </svg>
            <svg
              className="absolute top-1/2 right-full -translate-y-1/2 -translate-x-32 transform"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
              />
            </svg>
            <svg
              className="absolute bottom-12 left-full translate-x-32 transform"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="d3eb07ae-5182-43e6-857d-35c643af9034"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
              />
            </svg>
          </div>
        </div>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-prose text-lg">
            <h1>
              <span className="block text-center text-lg font-semibold text-red-500">
                Introducing
              </span>
              <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                MyExpo
              </span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-500">
              MyExpo is an Exhibition/Expo Management Website.
            </p>
          </div>
          <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
            <p>Features:</p>
            <ul role="list">
              <li>Browse items in the Expos/Exhibitions.</li>
              <li>Become a seller by renting a place.</li>
              <li>Become an Expo/Exhibition owner.</li>
            </ul>

            <h2>Discover the World of Expos with Us</h2>
            <p>
              We are dedicated to bringing you the latest and greatest
              information about expos from around the world. Whether you're
              interested in attending an expo, exhibiting at one, or just
              learning more about these exciting events, we've got you covered.
            </p>
            <p>
              Our team of experts is constantly scouring the globe for the most
              interesting and innovative expos, and we bring that information to
              you in an easy-to-digest format. From technology and science to
              art and culture, there's an expo out there for everyone.
            </p>
            <h2>Explore and Find Your Next Adventure</h2>
            <p>
              So take a look around our site and discover the world of expos.
              We're sure you'll find something that piques your interest.
            </p>
            <p>Thank you for visiting!</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
