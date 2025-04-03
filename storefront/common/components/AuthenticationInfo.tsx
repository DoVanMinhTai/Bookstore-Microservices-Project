import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AuthenticationInfo() {
  type AuthenticatedUser = {
    userName: string;
  };

  type AuthenticationInfoVm = {
    isAuthenticated: boolean;
    authenticatedUser: AuthenticatedUser;
  };

  const [authenticatedInfoVm, setAuthenticatedInfoVm] = useState<AuthenticationInfoVm>({
    isAuthenticated: false,
    authenticatedUser: { userName: '' },
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  async function getAuthenticationInfo(): Promise<AuthenticationInfoVm> {
    const res = await fetch(`http://localhost:8087/authentication`);
    return await res.json();
  }

  useEffect(() => {
    getAuthenticationInfo().then((data) => {
      setAuthenticatedInfoVm(data);
    });
  }, []);

  return (
    <div className="">
      {authenticatedInfoVm.isAuthenticated ? (
        <div className="">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-slate-800 px-4 py-2 rounded-lg text-white focus:outline-none "
          >
            Tài Khoản
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute mt-1  bg-gray-800 text-white rounded-md shadow-lg ">
              <div className="block text-lg px-4 py-2">
               Xin chào: {authenticatedInfoVm.authenticatedUser.userName.split('@')[0]}

              </div>
              <Link href="/profile" className="block px-4 py-2 hover:bg-gray-700">
                Profile
              </Link>
              <Link href="/my-orders" className="block px-4 py-2 hover:bg-gray-700">
                My Orders
              </Link>
              <Link href="/logout" className="block px-4 py-2 hover:bg-gray-700">
                Logout
              </Link>
            </div>
          )}
        </div>
      ) : (
        <Link href="http://localhost:8087/oauth2/authorization/keycloak" className="text-gray-300 hover:text-white">
          Login
        </Link>
      )}
    </div>
  );
}
