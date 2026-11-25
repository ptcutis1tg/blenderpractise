import { createClient, User, Session } from '@supabase/supabase-js';

// Default to project iidfgycdawaygzbkqsgy credentials
const SUPABASE_URL = 
  import.meta.env.VITE_SUPABASE_URL || 'https://iidfgycdawaygzbkqsgy.supabase.co';

const SUPABASE_ANON_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_GEITqLoGzlje3LI9-Yb4UQ_1RJP70Ge';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  streakDays: number;
  totalHoursStudied: number;
}

export class AuthService {
  /**
   * Get currently active session
   */
  static async getSession(): Promise<Session | null> {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    } catch (e) {
      console.warn('[AuthService] getSession failed:', e);
      return null;
    }
  }

  /**
   * Get currently active user
   */
  static async getCurrentUser(): Promise<User | null> {
    try {
      const { data } = await supabase.auth.getUser();
      return data.user;
    } catch (e) {
      console.warn('[AuthService] getCurrentUser failed:', e);
      return null;
    }
  }

  /**
   * Fetch user profile from public.profiles
   */
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error || !data) return null;

      return {
        id: data.id,
        email: data.email || '',
        displayName: data.display_name || data.email?.split('@')[0] || 'Blender Artist',
        avatarUrl: data.avatar_url,
        streakDays: data.streak_days || 0,
        totalHoursStudied: Number(data.total_hours_studied) || 0,
      };
    } catch (e) {
      console.warn('[AuthService] getUserProfile failed:', e);
      return null;
    }
  }

  /**
   * Register with Email & Password
   */
  static async signUpWithEmail(email: string, password: string, displayName?: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: displayName || email.split('@')[0],
        },
      },
    });

    if (error) throw error;
    return data;
  }

  /**
   * Sign in with Email & Password
   */
  static async signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }

  /**
   * Sign in with Google (OAuth)
   */
  static async signInWithGoogle() {
    const redirectUrl = window.location.origin + window.location.pathname;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
      },
    });

    if (error) throw error;
    return data;
  }

  /**
   * Sign out
   */
  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  /**
   * Send Password Reset Email
   */
  static async resetPassword(email: string) {
    const redirectUrl = window.location.origin + window.location.pathname;
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });
    if (error) throw error;
    return data;
  }

  /**
   * Listen to Auth state changes
   */
  static onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}
