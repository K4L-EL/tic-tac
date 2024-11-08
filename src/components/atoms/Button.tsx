type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  state: 'enabled' | 'clicked' | 'disabled';
};

export const Button = ({ onClick, children, state }: ButtonProps) => {
  const handleClick = () => {
    if (state === 'enabled') {
      onClick();
    }
  };

  const getButtonClass = () => {
    switch (state) {
      case 'enabled':
        return 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg transform transition-all hover:scale-105';
      case 'clicked':
        return 'bg-green-600 text-white shadow-md transform transition-all scale-105';
      case 'disabled':
        return 'bg-gray-500 text-gray-300 cursor-not-allowed';
      default:
        return '';
    }
  };

  return (
    <button
      className={`px-6 py-3 rounded-lg text-lg font-semibold ${getButtonClass()}`}
      onClick={handleClick}
      disabled={state === 'disabled'}
    >
      {children}
    </button>
  );
};
