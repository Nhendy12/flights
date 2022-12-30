class Map < ApplicationRecord
    has_many :airports

    attr_accessor :csv_file
end
