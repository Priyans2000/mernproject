import { ArrowRight } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Getting Started with MERN Stack",
    desc: "Learn how to build full stack apps using MongoDB, Express, React and Node.",
    image: "https://source.unsplash.com/600x400/?coding"
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS",
    desc: "Build modern and responsive UI faster using utility-first CSS.",
    image: "https://source.unsplash.com/600x400/?laptop"
  },
  {
    id: 3,
    title: "JWT Authentication Guide",
    desc: "Secure your applications using JSON Web Tokens step by step.",
    image: "https://source.unsplash.com/600x400/?technology"
  }
];

const Home = () => {
  return (
    <div className="pt-15 bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Welcome to Priyansh Blog 🚀
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Discover articles on Web Development, MERN Stack, Authentication, UI Design and more.
        </p>

        <button className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition">
          Explore Posts
        </button>
      </section>

      {/* Posts Section */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-semibold mb-8 text-gray-800">
          Latest Posts
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  {post.desc}
                </p>

                <button className="mt-4 flex items-center text-indigo-600 font-medium hover:gap-2 transition-all">
                  Read More <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
};

export default Home;