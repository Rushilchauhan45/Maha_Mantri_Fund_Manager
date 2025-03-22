
import { useState } from 'react';
import { Member } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface CommunityMemberProps {
  member: Member;
}

const CommunityMember = ({ member }: CommunityMemberProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div 
      className="glass-card p-6 relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`transition-all duration-500 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}>
        <div className="flex flex-col items-center text-center">
          <Badge variant="outline" className="mb-4">
            {member.role}
          </Badge>
          
          <Avatar className="w-24 h-24 mb-4 border-2 border-primary/20 shadow-lg">
            <AvatarImage src={member.image} alt={member.name} />
            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
          </Avatar>
          
          <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
          
          <p className="text-muted-foreground text-sm">{member.description}</p>
        </div>
      </div>
      
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      ></div>
    </div>
  );
};

export default CommunityMember;
