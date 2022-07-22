import { Link } from 'react-router-dom';

const Header: React.FC = (_props) => {
  return (
    <div className="flex flex-row justify-between items-center px-10 py-2 border-2 bg-[#D8B98C]">
      <Link to="/">
        <div className="text-2xl">JEWEPE</div>
      </Link>
      <div className="space-x-4">
        <Link to="/adminlogin">
          <button className="border-2 rounded-xl p-2 text-center text-sm bg-[#C7964E]">
            Login as Admin
          </button>
        </Link>
        <Link to="/userlogin">
          <button className="border-2 rounded-xl p-2 text-center text-sm bg-[#C7964E]">
            Login as User
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
