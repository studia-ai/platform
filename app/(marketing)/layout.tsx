import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MarketingLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="bg-slate-100">
        <div data-marketing="true" className="relative h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          {children}
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default MarketingLayout;
