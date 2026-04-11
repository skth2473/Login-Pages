'use client';

import { useState, useRef, useEffect } from 'react';
import CasinoLogin from '@/components/casino-login';

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <CasinoLogin />
    </main>
  );
}
