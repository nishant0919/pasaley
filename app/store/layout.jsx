import React from 'react';

const StoreLayout = ({ children }) => {
  return (
    <div>
      {/* You can add common elements here like headers, footers */}
      <header>
        <nav>
          {/* Navigation items */}
        </nav>
      </header>
      
      <main>{children}</main>
      
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default StoreLayout;
