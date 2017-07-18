class AchievementEvent
  class << self
    def subscribe(klass, subscriber)
      subscribers[klass] << subscriber
    end

    def send(klass, _params = {})
      puts subscribers[klass]
      subscribers[klass].each do |x|
        x.call _params
      end
    end

    private

    def subscribers
      @subscribers ||= Hash.new { |hash, key| hash[key] = [] }
    end
  end
end
