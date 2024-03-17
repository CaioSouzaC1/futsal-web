import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ProgressBar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <div className={`h-2 bg-red-500 fixed top-0 left-0 right-0 ${!loading ? "opacity-0" : "opacity-100"}`}>
      <div
        className={`h-full bg-white transition-all duration-150 ${!loading ? "w-full" : "w-0"}`}
        style={{ marginLeft: !loading ? '0' : '100%' }}
      />
    </div>
  );
};

export default ProgressBar;
