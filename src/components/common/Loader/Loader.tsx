import { MutatingDots } from 'react-loader-spinner'

export const Loader = () => (
  
  <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-40 backdrop-blur-[2px]">
    <MutatingDots 
      height="100"
      width="100"
      color="#1D4ED8"
      secondaryColor= '#EAB308'
      radius='12.5'
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{
        position: 'fixed',
        top: '0',
        bottom: '0',
        left: '0', 
        right: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}
      wrapperClass=""
      visible={true}
    />
  </div>
);
