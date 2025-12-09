import { Link } from "react-router";
import { MessageCircle, MapPin, Globe } from "lucide-react";

const FriendDetailCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-lg transition-all duration-300">
      <div className="card-body p-6">
        {/* Header with Avatar and Name */}
        <div className="flex items-start gap-4 mb-4">
          <div className="avatar">
            <div className="size-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={friend.profilePic} alt={friend.fullName} />
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">{friend.fullName}</h3>
            {friend.nativeLanguage && (
              <div className="flex items-center gap-1 text-sm opacity-70">
                <Globe className="size-4" />
                <span className="capitalize">{friend.nativeLanguage}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        {friend.bio && (
          <p className="text-sm opacity-80 mb-4 line-clamp-2">{friend.bio}</p>
        )}

        {/* Location */}
        {friend.location && (
          <div className="flex items-center gap-2 text-sm opacity-70 mb-4">
            <MapPin className="size-4" />
            <span>{friend.location}</span>
          </div>
        )}

        {/* Action Button */}
        <Link 
          to={`/chat/${friend._id}`} 
          className="btn btn-primary w-full"
        >
          <MessageCircle className="size-4" />
          Start Chat
        </Link>
      </div>
    </div>
  );
};

export default FriendDetailCard;
