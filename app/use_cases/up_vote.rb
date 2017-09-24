class UpVote
  include ::UseCase

  def initialize(comic_id)
    @comic_id = comic_id
  end

  def perform
    create_or_increase
  end

  private

  attr_reader :comic_id

  def create_or_increase
    # http://guidelines.plataformatec.com.br/ruby.html read 'tap'
    comic_vote = ComicVote.upvote(comic_id: comic_id)
    success = comic_vote.save
    comic_vote.tap do |comic_vote|
      errors.add(:base, 'Vote failed to save') unless success
    end
  end
end
