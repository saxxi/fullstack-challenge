require 'comic'

class FetchComic
  include ::UseCase

  attr_reader :result

  def initialize(comic_id, comic: Comic)
    @comic_id = comic_id
    @comic = comic
  end

  def perform
    @result = fetch_comic
  end

  private

  attr_reader :comic

  def fetch_comic
    result = comic.find(@comic_id).tap do |response|
      if response.is_a? StandardError
        errors[:base] << response.status
      else
        errors[:base] << 'Failed to find comic' unless response.respond_to?(:each) && response.count > 0
      end
    end

    errors.blank? ? result.first : nil
  end
end
