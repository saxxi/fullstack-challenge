class Comic

  def self.find(comic_id)
    new.find comic_id
  end

  def initialize(api_client = Marvel::Client.new)
    @api_client = api_client
  end

  def find(comic_id)
    @api_client.comic(comic_id)
  end

end
