
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users } from "lucide-react";

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "Valorant Championships",
    date: "April 15, 2025",
    time: "18:00 UTC",
    participants: 128,
    prizePool: "$100,000",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FtZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 2,
    title: "Fortnite Weekend Cup",
    date: "April 20, 2025",
    time: "15:00 UTC",
    participants: 256,
    prizePool: "$50,000",
    image: "https://images.unsplash.com/photo-1558742619-1486c8cc8e9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdhbWluZ3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 3,
    title: "League of Legends Tournament",
    date: "May 5, 2025",
    time: "19:00 UTC",
    participants: 64,
    prizePool: "$75,000",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGdhbWluZ3xlbnwwfHwwfHx8MA%3D%3D"
  }
];

export function UpcomingEvents() {
  return (
    <section className="py-12">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Upcoming Events</h2>
            <p className="text-muted-foreground mt-1">Join tournaments and win exciting prizes</p>
          </div>
          <Button variant="link" className="text-gaming-primary hover:text-gaming-primary/90 p-0 h-auto mt-4 md:mt-0">
            View all events →
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {UPCOMING_EVENTS.map((event) => (
            <Card key={event.id} className="overflow-hidden group hover:shadow-lg transition-all">
              <div className="h-40 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{event.title}</CardTitle>
                  <Badge className="bg-gaming-accent text-white">
                    {event.prizePool}
                  </Badge>
                </div>
                <CardDescription>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{event.date} at {event.time}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-1 text-muted-foreground mb-4">
                  <Users className="h-4 w-4" />
                  <span>{event.participants} participants</span>
                </div>
                <Button className="w-full bg-gaming-primary hover:bg-gaming-primary/90">
                  Register Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
