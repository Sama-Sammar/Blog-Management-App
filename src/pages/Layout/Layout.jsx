import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

function Layout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

export default Layout;
