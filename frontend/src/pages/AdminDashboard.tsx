import AuthenticatedAdminHeader from '../components/AuthenticatedAdminHeader';

const AdminDashboard: React.FC = (_props) => {
  return (
    <div className="w-full">
      <AuthenticatedAdminHeader />

      {/* content */}

      <div className="w-full flex flex-col items-center pt-32 space-y-10">
        <div className="text-center">Halo Kembali, admin Blablabla</div>
        <div className="w-full flex flex-row justify-center space-x-52">
          <div className="bg-[#C7964E] p-16">DATA MAHASISWA</div>
          <div className="bg-[#C7964E] p-16">DATA KURSUS</div>
          <div className="bg-[#C7964E] p-16">DATA JADWAL KURSUS</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
