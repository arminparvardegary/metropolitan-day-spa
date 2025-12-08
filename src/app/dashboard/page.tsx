"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Trash2,
  Sparkles,
  LayoutDashboard,
  Users,
  CalendarDays,
  TrendingUp,
} from "lucide-react";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = localStorage.getItem("spa_bookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  const updateBookingStatus = (id: string, status: "confirmed" | "cancelled") => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status } : b
    );
    setBookings(updated);
    localStorage.setItem("spa_bookings", JSON.stringify(updated));
  };

  const deleteBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem("spa_bookings", JSON.stringify(updated));
  };

  const filteredBookings = bookings.filter((b) =>
    filter === "all" ? true : b.status === filter
  );

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user?.isAdmin) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-charcoal-950 pt-24 pb-20">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-gold-400" />
              </div>
              <div>
                <h1 className="font-serif text-3xl md:text-4xl text-white">Dashboard</h1>
                <p className="text-gray-400">Manage your spa bookings</p>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            {[
              { label: "Total Bookings", value: stats.total, icon: CalendarDays, color: "from-gold-500 to-gold-600" },
              { label: "Pending", value: stats.pending, icon: Clock, color: "from-yellow-500 to-orange-500" },
              { label: "Confirmed", value: stats.confirmed, icon: CheckCircle, color: "from-green-500 to-emerald-500" },
              { label: "Cancelled", value: stats.cancelled, icon: XCircle, color: "from-red-500 to-rose-500" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="bg-charcoal-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="font-serif text-3xl text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {[
              { key: "all", label: "All" },
              { key: "pending", label: "Pending" },
              { key: "confirmed", label: "Confirmed" },
              { key: "cancelled", label: "Cancelled" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  filter === tab.key
                    ? "bg-gold-500 text-charcoal-950"
                    : "bg-charcoal-800 text-gray-300 hover:bg-charcoal-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Bookings List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {filteredBookings.length === 0 ? (
              <div className="bg-charcoal-900/50 backdrop-blur-xl rounded-2xl p-12 border border-white/10 text-center">
                <Sparkles className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                <h3 className="font-serif text-xl text-white mb-2">No Bookings Found</h3>
                <p className="text-gray-400">Bookings will appear here when customers make reservations.</p>
              </div>
            ) : (
              filteredBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-charcoal-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-gold-500/30 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Booking Info */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                          <User className="w-4 h-4" />
                          <span>Customer</span>
                        </div>
                        <p className="text-white font-medium">{booking.name}</p>
                        <p className="text-gray-400 text-sm">{booking.email}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                          <Sparkles className="w-4 h-4" />
                          <span>Service</span>
                        </div>
                        <p className="text-white font-medium">{booking.service}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                          <Calendar className="w-4 h-4" />
                          <span>Date</span>
                        </div>
                        <p className="text-white font-medium">{booking.date}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                          <Clock className="w-4 h-4" />
                          <span>Time</span>
                        </div>
                        <p className="text-white font-medium">{booking.time}</p>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                          booking.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : booking.status === "confirmed"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>

                      {booking.status === "pending" && (
                        <>
                          <button
                            onClick={() => updateBookingStatus(booking.id, "confirmed")}
                            className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                            title="Confirm"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => updateBookingStatus(booking.id, "cancelled")}
                            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                            title="Cancel"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => deleteBooking(booking.id)}
                        className="p-2 bg-charcoal-700 text-gray-400 rounded-lg hover:bg-charcoal-600 hover:text-white transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}

