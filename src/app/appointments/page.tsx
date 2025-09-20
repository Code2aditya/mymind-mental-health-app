"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, Video, Phone, MapPin, Star, Plus, Search, Filter, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface Appointment {
  id: string;
  title: string;
  description: string;
  doctor: Doctor;
  date: Date;
  duration: number;
  type: "in-person" | "video" | "phone";
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  location?: string;
  notes?: string;
  reminderSent: boolean;
  price: number;
  insuranceAccepted: boolean;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  reviews: number;
  avatar?: string;
  available: boolean;
  nextAvailable: Date;
  consultationFee: number;
  acceptsInsurance: boolean;
  languages: string[];
  about: string;
}

interface TimeSlot {
  id: string;
  doctorId: string;
  date: Date;
  startTime: string;
  endTime: string;
  available: boolean;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [appointmentType, setAppointmentType] = useState<"in-person" | "video" | "phone">("video");
  const [notes, setNotes] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    // Mock doctors data
    const mockDoctors: Doctor[] = [
      {
        id: "1",
        name: "Dr. Sarah Johnson",
        specialty: "Psychiatrist",
        experience: 15,
        rating: 4.9,
        reviews: 342,
        available: true,
        nextAvailable: new Date(Date.now() + 86400000),
        consultationFee: 150,
        acceptsInsurance: true,
        languages: ["English", "Spanish"],
        about: "Board-certified psychiatrist specializing in anxiety disorders and depression. Compassionate and evidence-based approach to mental health care."
      },
      {
        id: "2",
        name: "Dr. Michael Chen",
        specialty: "Psychologist",
        experience: 12,
        rating: 4.8,
        reviews: 289,
        available: true,
        nextAvailable: new Date(Date.now() + 172800000),
        consultationFee: 120,
        acceptsInsurance: true,
        languages: ["English", "Mandarin"],
        about: "Clinical psychologist with expertise in cognitive behavioral therapy and mindfulness-based interventions."
      },
      {
        id: "3",
        name: "Dr. Emily Rodriguez",
        specialty: "Therapist",
        experience: 8,
        rating: 4.7,
        reviews: 156,
        available: false,
        nextAvailable: new Date(Date.now() + 604800000),
        consultationFee: 100,
        acceptsInsurance: false,
        languages: ["English", "Spanish"],
        about: "Licensed therapist specializing in trauma-informed care and family therapy."
      },
      {
        id: "4",
        name: "Dr. James Thompson",
        specialty: "Psychiatrist",
        experience: 20,
        rating: 4.9,
        reviews: 567,
        available: true,
        nextAvailable: new Date(Date.now() + 259200000),
        consultationFee: 180,
        acceptsInsurance: true,
        languages: ["English"],
        about: "Senior psychiatrist with extensive experience in mood disorders and medication management."
      },
      {
        id: "5",
        name: "Dr. Lisa Wang",
        specialty: "Counselor",
        experience: 6,
        rating: 4.6,
        reviews: 98,
        available: true,
        nextAvailable: new Date(Date.now() + 432000000),
        consultationFee: 80,
        acceptsInsurance: false,
        languages: ["English", "Korean"],
        about: "Professional counselor focusing on stress management and career counseling."
      }
    ];
    setDoctors(mockDoctors);

    // Mock appointments data
    const mockAppointments: Appointment[] = [
      {
        id: "1",
        title: "Initial Consultation",
        description: "First appointment to discuss treatment options",
        doctor: mockDoctors[0],
        date: new Date(Date.now() + 86400000),
        duration: 60,
        type: "video",
        status: "scheduled",
        reminderSent: true,
        price: 150,
        insuranceAccepted: true
      },
      {
        id: "2",
        title: "Follow-up Session",
        description: "Regular check-in and progress review",
        doctor: mockDoctors[1],
        date: new Date(Date.now() + 172800000),
        duration: 45,
        type: "phone",
        status: "scheduled",
        reminderSent: false,
        price: 120,
        insuranceAccepted: true
      },
      {
        id: "3",
        title: "Therapy Session",
        description: "Cognitive behavioral therapy session",
        doctor: mockDoctors[2],
        date: new Date(Date.now() - 86400000),
        duration: 50,
        type: "in-person",
        status: "completed",
        location: "123 Main St, Suite 100",
        reminderSent: true,
        price: 100,
        insuranceAccepted: false
      }
    ];
    setAppointments(mockAppointments);

    // Generate mock time slots
    const generateTimeSlots = () => {
      const slots: TimeSlot[] = [];
      const today = new Date();
      
      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + day);
        
        for (let hour = 9; hour < 17; hour++) {
          for (let minute = 0; minute < 60; minute += 30) {
            const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            const endTime = `${(hour + Math.floor((minute + 30) / 60)).toString().padStart(2, '0')}:${((minute + 30) % 60).toString().padStart(2, '0')}`;
            
            slots.push({
              id: `${day}-${hour}-${minute}`,
              doctorId: "1",
              date: new Date(currentDate),
              startTime,
              endTime,
              available: Math.random() > 0.3
            });
          }
        }
      }
      
      return slots;
    };

    setTimeSlots(generateTimeSlots());
  }, []);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const upcomingAppointments = appointments.filter(apt => apt.status === "scheduled");
  const pastAppointments = appointments.filter(apt => apt.status === "completed");
  const cancelledAppointments = appointments.filter(apt => apt.status === "cancelled" || apt.status === "no-show");

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      case "no-show": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="h-4 w-4" />;
      case "phone": return <Phone className="h-4 w-4" />;
      case "in-person": return <MapPin className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getAvailableTimeSlots = (doctorId: string, date: string) => {
    return timeSlots.filter(slot => 
      slot.doctorId === doctorId && 
      slot.date.toDateString() === new Date(date).toDateString() &&
      slot.available
    );
  };

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) return;

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      title: "New Appointment",
      description: notes || "General consultation",
      doctor: selectedDoctor,
      date: new Date(selectedDate + 'T' + selectedTime),
      duration: 60,
      type: appointmentType,
      status: "scheduled",
      notes,
      reminderSent: false,
      price: selectedDoctor.consultationFee,
      insuranceAccepted: selectedDoctor.acceptsInsurance
    };

    setAppointments([...appointments, newAppointment]);
    
    // Reset form
    setSelectedDoctor(null);
    setSelectedDate("");
    setSelectedTime("");
    setNotes("");
    setAppointmentType("video");
  };

  const specialties = ["all", ...new Set(doctors.map(d => d.specialty))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Easy Appointments 📅
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Schedule and manage your mental health appointments with ease
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{upcomingAppointments.length}</div>
              <p className="text-xs text-muted-foreground">
                Scheduled appointments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{pastAppointments.length}</div>
              <p className="text-xs text-muted-foreground">
                Past sessions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Doctors</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {doctors.filter(d => d.available).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Ready to help
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-orange-600">
                {upcomingAppointments.length > 0 
                  ? formatDate(upcomingAppointments[0].date)
                  : "None scheduled"}
              </div>
              <p className="text-xs text-muted-foreground">
                {upcomingAppointments.length > 0 ? "Coming up soon" : "Book one now"}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="appointments">My Appointments</TabsTrigger>
            <TabsTrigger value="book">Book New</TabsTrigger>
            <TabsTrigger value="doctors">Find Doctors</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Management</CardTitle>
                <CardDescription>
                  View and manage your upcoming and past appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList>
                    <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
                    <TabsTrigger value="past">Past ({pastAppointments.length})</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled ({cancelledAppointments.length})</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming" className="mt-4">
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
                        <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-4">
                                <div className="flex items-center gap-2">
                                  {getTypeIcon(appointment.type)}
                                  <div>
                                    <h3 className="font-semibold">{appointment.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      {appointment.doctor.name} • {appointment.doctor.specialty}
                                    </p>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                      <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        {formatDateTime(appointment.date)}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {appointment.duration} minutes
                                      </span>
                                    </div>
                                    {appointment.location && (
                                      <p className="text-sm text-gray-500 mt-1">
                                        {appointment.location}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <Badge className={getStatusColor(appointment.status)}>
                                  {appointment.status}
                                </Badge>
                                <div className="flex items-center gap-1">
                                  <span className="font-semibold">${appointment.price}</span>
                                  {appointment.insuranceAccepted && (
                                    <Badge variant="outline" className="text-xs">Insurance</Badge>
                                  )}
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">Reschedule</Button>
                                  <Button variant="destructive" size="sm">Cancel</Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      {upcomingAppointments.length === 0 && (
                        <div className="text-center py-8">
                          <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                          <h3 className="text-lg font-semibold mb-2">No Upcoming Appointments</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Book your first appointment to get started
                          </p>
                          <Button onClick={() => setActiveTab("book")}>Book Appointment</Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="past" className="mt-4">
                    <div className="space-y-4">
                      {pastAppointments.map((appointment) => (
                        <Card key={appointment.id}>
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-4">
                                <div className="flex items-center gap-2">
                                  {getTypeIcon(appointment.type)}
                                  <div>
                                    <h3 className="font-semibold">{appointment.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      {appointment.doctor.name} • {appointment.doctor.specialty}
                                    </p>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                      <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        {formatDateTime(appointment.date)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <Badge className={getStatusColor(appointment.status)}>
                                  {appointment.status}
                                </Badge>
                                <Button variant="outline" size="sm">Book Again</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="cancelled" className="mt-4">
                    <div className="space-y-4">
                      {cancelledAppointments.map((appointment) => (
                        <Card key={appointment.id}>
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-4">
                                <div className="flex items-center gap-2">
                                  {getTypeIcon(appointment.type)}
                                  <div>
                                    <h3 className="font-semibold">{appointment.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      {appointment.doctor.name} • {appointment.doctor.specialty}
                                    </p>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                      <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        {formatDateTime(appointment.date)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <Badge className={getStatusColor(appointment.status)}>
                                  {appointment.status}
                                </Badge>
                                <Button variant="outline" size="sm">Rebook</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="book">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Book New Appointment</CardTitle>
                  <CardDescription>
                    Schedule a session with a mental health professional
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="doctor-select">Select Doctor</Label>
                      <Select onValueChange={(value) => {
                        const doctor = doctors.find(d => d.id === value);
                        setSelectedDoctor(doctor || null);
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          {doctors.filter(d => d.available).map((doctor) => (
                            <SelectItem key={doctor.id} value={doctor.id}>
                              {doctor.name} - {doctor.specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedDoctor && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                          </div>
                          <div>
                            <h4 className="font-medium">{selectedDoctor.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {selectedDoctor.specialty} • {selectedDoctor.experience} years experience
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm">{selectedDoctor.rating}</span>
                              </div>
                              <span className="text-sm text-gray-500">• ${selectedDoctor.consultationFee}</span>
                              {selectedDoctor.acceptsInsurance && (
                                <Badge variant="outline" className="text-xs">Insurance</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="appointment-type">Appointment Type</Label>
                      <Select value={appointmentType} onValueChange={(value: "in-person" | "video" | "phone") => setAppointmentType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video Call</SelectItem>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="in-person">In-Person</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="appointment-date">Date</Label>
                      <Input 
                        id="appointment-date"
                        type="date" 
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    {selectedDate && selectedDoctor && (
                      <div>
                        <Label>Available Time Slots</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {getAvailableTimeSlots(selectedDoctor.id, selectedDate).slice(0, 9).map((slot) => (
                            <Button
                              key={slot.id}
                              variant={selectedTime === slot.startTime ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedTime(slot.startTime)}
                              className="text-xs"
                            >
                              {slot.startTime}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="appointment-notes">Notes (Optional)</Label>
                      <Textarea 
                        id="appointment-notes"
                        placeholder="Any specific concerns or topics you'd like to discuss..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>

                    <Button 
                      onClick={handleBookAppointment}
                      className="w-full"
                      disabled={!selectedDoctor || !selectedDate || !selectedTime}
                    >
                      Book Appointment - ${selectedDoctor?.consultationFee || 0}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Information</CardTitle>
                  <CardDescription>
                    What you need to know before booking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">🔒 Privacy & Security</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        All appointments are confidential and secure. We use end-to-end encryption for all communications.
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">💳 Payment & Insurance</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Payment is required at booking. Many doctors accept insurance. Check with your provider for coverage details.
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">📱 Cancellation Policy</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Free cancellation up to 24 hours before your appointment. Late cancellations may incur a fee.
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">⚡ Emergency Support</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        If you're experiencing a mental health emergency, please call emergency services or visit your nearest emergency room.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="doctors">
            <Card>
              <CardHeader>
                <CardTitle>Find Mental Health Professionals</CardTitle>
                <CardDescription>
                  Browse our network of qualified doctors and therapists
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Search and Filters */}
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by name or specialty..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialties.map(specialty => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty === "all" ? "All Specialties" : specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Doctors Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDoctors.map((doctor) => (
                      <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                                <User className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{doctor.name}</CardTitle>
                                <CardDescription>{doctor.specialty}</CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm">{doctor.rating}</span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Experience</span>
                              <span>{doctor.experience} years</span>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Reviews</span>
                              <span>{doctor.reviews} reviews</span>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Fee</span>
                              <span className="font-medium">${doctor.consultationFee}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Badge variant={doctor.available ? "default" : "secondary"}>
                                {doctor.available ? "Available" : "Unavailable"}
                              </Badge>
                              {doctor.acceptsInsurance && (
                                <Badge variant="outline">Insurance</Badge>
                              )}
                            </div>
                            
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              <p className="line-clamp-2">{doctor.about}</p>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button 
                                className="flex-1" 
                                disabled={!doctor.available}
                                onClick={() => {
                                  setSelectedDoctor(doctor);
                                  setActiveTab("book");
                                }}
                              >
                                {doctor.available ? "Book Now" : "Unavailable"}
                              </Button>
                              <Button variant="outline" size="sm">View Profile</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}