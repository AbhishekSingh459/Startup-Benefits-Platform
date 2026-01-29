"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const schema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email address"),
  // company: z.string().min(2, "Company name required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterPage() {
  const { register: authRegister } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register: formRegister, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    await authRegister(data);
    router.push('/deals');
  };

  return (
    <div className="flex justify-center items-center py-20 px-6">
      <div className="w-full max-w-md p-8 glass rounded-3xl border-white/5">
        <h1 className="text-3xl font-bold mb-2">Join the Network</h1>
        <p className="text-gray-400 mb-8">Access $100k+ in startup perks today.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Full Name</label>
            <input 
              {...formRegister('name')}
              className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              placeholder="Jane Founders"
            />
            {errors.name?.message && <p className="mt-1 text-sm text-rose-500">{(errors.name.message as string)}</p>}
          </div>

          {/* <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Company Name</label>
            <input 
              {...formRegister('company')}
              className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              placeholder="Acme AI"
            />
            {errors.company?.message && <p className="mt-1 text-sm text-rose-500">{(errors.company.message as string)}</p>}
          </div> */}

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
            <input 
              {...formRegister('email')}
              className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              placeholder="jane@acmeai.com"
            />
            {errors.email?.message && <p className="mt-1 text-sm text-rose-500">{(errors.email.message as string)}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
            <input 
              type="password"
              {...formRegister('password')}
              className="w-full px-4 py-3 glass rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              placeholder="••••••••"
            />
            {errors.password?.message && <p className="mt-1 text-sm text-rose-500">{(errors.password.message as string)}</p>}
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-500 hover:bg-brand-600 transition-all text-white rounded-xl font-bold flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Create Account"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-400 text-sm">
          Already have an account? <Link href="/login" className="text-brand-500 font-bold">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
