import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Sparkles, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Cloud,
  Loader2
} from 'lucide-react';
import { AuthService } from '../../services/supabaseClient';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessInfo(null);
    setIsLoading(true);

    try {
      if (mode === 'signin') {
        await AuthService.signInWithEmail(email, password);
        onSuccess('Đăng nhập thành công! Đang đồng bộ tiến độ học tập...');
        onClose();
      } else if (mode === 'signup') {
        if (password.length < 6) {
          throw new Error('Mật khẩu phải có ít nhất 6 ký tự.');
        }
        const data = await AuthService.signUpWithEmail(email, password, displayName);
        if (data.session) {
          onSuccess('Đăng ký và kích hoạt tài khoản thành công!');
          onClose();
        } else {
          setSuccessInfo('Đăng ký thành công! Vui lòng kiểm tra email của bạn để xác thực tài khoản (nếu Supabase bật email confirmation).');
        }
      } else if (mode === 'forgot') {
        await AuthService.resetPassword(email);
        setSuccessInfo('Email khôi phục mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư!');
      }
    } catch (err: any) {
      console.error('[AuthModal] Error:', err);
      let msg = err?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      if (msg.includes('Invalid login credentials')) {
        msg = 'Email hoặc mật khẩu không chính xác.';
      } else if (msg.includes('User already registered')) {
        msg = 'Email này đã được đăng ký tài khoản. Vui lòng chuyển sang Đăng nhập.';
      }
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setIsGoogleLoading(true);
    try {
      await AuthService.signInWithGoogle();
      // Browser will redirect to Google login
    } catch (err: any) {
      console.error('[GoogleAuth] Error:', err);
      setErrorMsg(err?.message || 'Không thể kết nối đến Google OAuth.');
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-[#111726] border border-[#273553] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X size={18} />
        </button>

        <div className="p-7">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-400">
              <Cloud size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                {mode === 'signin' && 'Đăng nhập tài khoản'}
                {mode === 'signup' && 'Tạo tài khoản BlenderFlow'}
                {mode === 'forgot' && 'Khôi phục mật khẩu'}
              </h2>
              <p className="text-xs text-slate-400">
                Lưu trữ tiến độ 3D & đồng bộ đa thiết bị tức thì
              </p>
            </div>
          </div>

          {/* Quick Google Sign In */}
          {mode !== 'forgot' && (
            <>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading || isLoading}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-[#1a2236] hover:bg-[#222c44] border border-[#314164] text-white text-sm font-semibold transition active:scale-[0.99] disabled:opacity-50"
              >
                {isGoogleLoading ? (
                  <Loader2 size={18} className="animate-spin text-indigo-400" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>Đăng nhập nhanh với Google</span>
              </button>

              <div className="relative my-5 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700/60" />
                </div>
                <span className="relative px-3 text-[11px] font-medium tracking-wider uppercase bg-[#111726] text-slate-500">
                  Hoặc sử dụng email
                </span>
              </div>
            </>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Họ và tên / Biệt danh
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="VD: Alex Nguyen"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c101a] border border-[#273553] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Địa chỉ Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c101a] border border-[#273553] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Mật khẩu
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode('forgot');
                        setErrorMsg(null);
                        setSuccessInfo(null);
                      }}
                      className="text-xs text-indigo-400 hover:text-indigo-300 transition"
                    >
                      Quên mật khẩu?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Tối thiểu 6 ký tự"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#0c101a] border border-[#273553] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {/* Error / Success Messages */}
            {errorMsg && (
              <div className="flex items-center gap-2 p-3 text-xs text-red-300 bg-red-950/40 border border-red-800/60 rounded-xl animate-fade-in">
                <AlertCircle size={15} className="shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successInfo && (
              <div className="flex items-center gap-2 p-3 text-xs text-emerald-300 bg-emerald-950/40 border border-emerald-800/60 rounded-xl animate-fade-in">
                <CheckCircle2 size={15} className="shrink-0 text-emerald-400" />
                <span>{successInfo}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition active:scale-[0.99] disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <>
                  <span>
                    {mode === 'signin' && 'Đăng nhập ngay'}
                    {mode === 'signup' && 'Hoàn tất đăng ký'}
                    {mode === 'forgot' && 'Gửi link khôi phục'}
                  </span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer toggle modes */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
            {mode === 'signin' && (
              <p>
                Chưa có tài khoản?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMsg(null);
                    setSuccessInfo(null);
                  }}
                  className="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline transition"
                >
                  Đăng ký miễn phí
                </button>
              </p>
            )}

            {mode === 'signup' && (
              <p>
                Đã có tài khoản?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setErrorMsg(null);
                    setSuccessInfo(null);
                  }}
                  className="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline transition"
                >
                  Đăng nhập tại đây
                </button>
              </p>
            )}

            {mode === 'forgot' && (
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setErrorMsg(null);
                  setSuccessInfo(null);
                }}
                className="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline transition"
              >
                ← Quay lại Đăng nhập
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
