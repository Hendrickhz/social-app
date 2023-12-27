
const useTimeAgo = () => {
    const timeAgo=(timestamp)=> {
        const now = new Date();
        const seconds = Math.floor((now - timestamp) / 1000);
      
        // Define time intervals in seconds
        const intervals = {
          y: 31536000,
          month: 2592000,
          w: 604800,
          d: 86400,
          h: 3600,
          min: 60,
        };
      
        // Calculate time difference in different units
        let counter;
        for (const unit in intervals) {
          counter = Math.floor(seconds / intervals[unit]);
      
          if (counter > 0) {
            return counter + '' + (counter === 1 ? unit : unit );
          }
        }
      
        return 'Just now';
      }
      return {timeAgo}
      
     
}

export default useTimeAgo