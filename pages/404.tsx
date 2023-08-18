// pages/404.js

import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <img src="/images/Erro404.jpg" alt="Erro 404" />
      <Link href="/">
        Voltar para a página inicial
      </Link>
    </div>
  );
}
