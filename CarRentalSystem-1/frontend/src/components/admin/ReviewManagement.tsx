
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import { Trash2, Star, PenSquare } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface Review {
  id: string;
  userId: string;
  userName: string;
  carId: string;
  carName: string;
  rating: number;
  comment: string;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    carId: '1',
    carName: 'Toyota RAV4',
    rating: 5,
    comment: 'Great car, very comfortable and fuel efficient!',
    date: '2023-11-15'
  },
  {
    id: '2',
    userId: '1',
    userName: 'John Doe',
    carId: '4',
    carName: 'Tesla Model 3',
    rating: 5,
    comment: 'Amazing electric car experience, super quiet and fun to drive!',
    date: '2023-12-22'
  },
  {
    id: '3',
    userId: '2',
    userName: 'Jane Smith',
    carId: '3',
    carName: 'BMW X5',
    rating: 4,
    comment: 'Luxurious ride, though fuel economy could be better.',
    date: '2023-10-30'
  }
];

const ReviewManagement = () => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [filterCar, setFilterCar] = useState<string>('all');
  const [newReview, setNewReview] = useState({
    carId: '',
    rating: 5,
    comment: ''
  });
  
  const filteredReviews = filterCar === 'all' 
    ? reviews 
    : reviews.filter(review => review.carId === filterCar);
  
  const uniqueCars = Array.from(new Set(reviews.map(review => review.carId)))
    .map(carId => {
      const review = reviews.find(r => r.carId === carId);
      return {
        id: carId,
        name: review ? review.carName : 'Unknown Car'
      };
    });
  
  const handleDeleteReview = (id: string) => {
    setReviews(reviews.filter(review => review.id !== id));
    toast.success('Review deleted successfully');
  };
  
  const handleAddReview = () => {
    if (!newReview.carId || !newReview.comment) {
      toast.error('Please select a car and add a comment');
      return;
    }
    
    const selectedCar = uniqueCars.find(car => car.id === newReview.carId);
    
    const review: Review = {
      id: `review-${Date.now()}`,
      userId: '1', // Default user ID
      userName: 'Current User',
      carId: newReview.carId,
      carName: selectedCar?.name || 'Unknown Car',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    setReviews([review, ...reviews]);
    
    // Reset form
    setNewReview({
      carId: '',
      rating: 5,
      comment: ''
    });
    
    toast.success('Review added successfully');
  };
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Review Management</h2>
      </div>
      
      {/* Add Review Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Review</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="car">Select Car</Label>
              <Select
                value={newReview.carId}
                onValueChange={(value) => setNewReview({...newReview, carId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a car" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueCars.map(car => (
                    <SelectItem key={car.id} value={car.id}>{car.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="rating">Rating</Label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-6 w-6 cursor-pointer ${star <= newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    onClick={() => setNewReview({...newReview, rating: star})}
                  />
                ))}
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="comment">Comment</Label>
              <Textarea 
                id="comment"
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                placeholder="Write your review here..."
                rows={3}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddReview}>Submit Review</Button>
        </CardFooter>
      </Card>
      
      {/* Filter Reviews */}
      <div className="flex items-center space-x-4 pb-4">
        <div className="flex-1">
          <Select
            value={filterCar}
            onValueChange={setFilterCar}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by car" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cars</SelectItem>
              {uniqueCars.map(car => (
                <SelectItem key={car.id} value={car.id}>{car.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <Card key={review.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">{review.carName}</CardTitle>
                    <div className="flex items-center space-x-1 mt-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-gray-700">{review.comment}</p>
                <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                  <span>By {review.userName}</span>
                  <span>{new Date(review.date).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No reviews found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewManagement;
