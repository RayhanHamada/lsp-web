import Header from '../components/Header';

const LandingPage: React.FC = (_props) => {
  return (
    <div className="w-full">
      <Header />

      {/* content */}
      <div className="w-full flex flex-row text-center justify-center pt-20 text-3xl">
        WEBSITE PENDAFTARAN KURSUS
      </div>
    </div>
  );
};

export default LandingPage;
