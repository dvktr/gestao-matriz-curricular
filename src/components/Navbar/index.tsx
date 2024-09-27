import Link from 'next/link';

const NavBar = () => {
  return (
    <div className="flex justify-center py-2">
    <nav className="bg-white shadow-md w-1/3 rounded-md">
      <div className="mx-auto px-8 py-3 flex justify-between items-center">
        {/* Logo e título */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold text-primary">
            GMC 
          </Link>
        </div>

        {/* Links de navegação */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-black font-bold hover:text-primary">
            Início
          </Link>
          <Link href="/simulaçao" className="text-black font-bold hover:text-primary">
            Simulação
          </Link>
          <Link href="/configuracao" className="text-black font-bold hover:text-primary">
            Configurações
          </Link>
        </div>


        
      </div>
    </nav>
    </div>
  );
};

export default NavBar;
