function App() {
  const blogs = [
    {
      id: 1,
      imgId: 1,
      title: "10 Tips to Improve Your Frontend Skills",
      description:
        "Learn simple techniques to write cleaner CSS and structure your HTML correctly.",
    },
    {
      id: 2,
      imgId: 2,
      title: "How to Stay Productive While Studying",
      description:
        "Planning your tasks and taking small breaks can boost your focus and efficiency.",
    },
    {
      id: 3,
      imgId: 3,
      title: "AI Tools Changing the Future",
      description:
        "New AI models are helping developers write code faster with improved accuracy.",
    },
    {
      id: 4,
      imgId: 4,
      title: "Minimalist UI Designs You Should Try",
      description:
        "Explore clean layouts and balanced spacing for a professional modern look.",
    },
    {
      id: 5,
      imgId: 5,
      title: "Why Responsive Design Matters",
      description:
        "A responsive website improves user experience and adapts to any screen size.",
    },
    {
      id: 6,
      imgId: 6,
      title: "5 Healthy Habits for a Better Day",
      description:
        "Walking daily and drinking enough water can greatly improve your energy.",
    },
  ];

  return (
    <>
      <header className="header">
        <div className="logo">BLOG</div>

        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </label>

        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">Add New Blog</a>
        </nav>
      </header>

      <main className="container">
        <h1 className="title">BLOG</h1>

        <section className="cards">
          {blogs.map((blog) => (
            <div className="card" key={blog.id}>
              <div
                className="img"
                style={{
                  backgroundImage: `url('https://picsum.photos/400/300?${blog.imgId}')`,
                }}
              ></div>
              <h3>{blog.title}</h3>
              <p>{blog.description}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="footer">
        <p>
          &copy; 2025 — <a href="#">LinkedIn</a>
        </p>
      </footer>
    </>
  );
}

export default App;
