require 'rails_helper'

RSpec.describe FetchComic do

  describe "#perform" do

    let(:api_result) { [ # note: api returns an array, even for `find`
        {
          id: 123,
          title: 'She-Hulk (2005) #17',
        }
      ]
    }
    let(:api_not_found) {
      Marvel::Response::Error.new 'code' => 404, 'status' => "not found"
    }
    let(:comic) { class_double('Comic') }

    context 'when requests an existing comic' do
      it 'returns the comic from api' do
        expect(comic).to(receive(:find)
          .with(123)
          .and_return(api_result)
        )

        subject = described_class.perform(123, comic: comic)

        expect(subject.success?).to eq true
        expect(subject.result).to eq api_result[0]
      end
    end

    context 'when requests an non-existing comic' do
      it 'does not succeed' do
        allow(comic).to(receive(:find)
          .with(123)
          .and_return(api_not_found)
        )

        subject = described_class.perform(123, comic: comic)

        expect(subject.success?).to eq false
        expect(subject.result).to be_blank
      end
    end

    context 'when requests an empty result comic' do
      it 'does not succeed' do
        allow(comic).to(receive(:find)
          .with(123)
          .and_return([])
        )

        subject = described_class.perform(123, comic: comic)

        expect(subject.success?).to eq false
        expect(subject.result).to be_blank
      end
    end

  end
end
