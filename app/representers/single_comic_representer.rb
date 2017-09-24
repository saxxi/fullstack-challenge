module SingleComicRepresenter
  include Roar::JSON

  property :id
  property :title
  property :issueNumber
  property :description
  property :isbn
  property :characters
  property :images
  property :creators
end
