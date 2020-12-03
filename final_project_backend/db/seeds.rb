# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'

Station.destroy_all
Line.destroy_all

csv_text = File.read(Rails.root.join('lib', 'seeds', 'Stations.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
# puts csv
# csv.each do |row|
#     puts row.to_hash
# end
csv.each do |row|
    s = Station.new
    s.complex_id = row['Complex ID']
    s.gtfs_stop_id = row['GTFS Stop ID']
    s.division = row['Division']
    s.route = row['Line']
    s.stop_name = row['Stop Name']
    s.borough = row['Borough']
    s.lines = row['Daytime Routes']
    s.structure = row['Structure']
    s.gtfs_lat = row['GTFS Latitude']
    s.gtfs_long = row['GTFS Longitude']
    s.north_d_label = row['North Direction Label']
    s.south_d_label = row['South Direction Label']
    s.save
end

puts "There are now #{Station.count} rows in the station table."

Line.create(name:"L")
Line.create(name:"ACE")
Line.create(name:"123456")
Line.create(name:"BDFM")
Line.create(name:"NQRW")
Line.create(name:"JZ")

puts "There are now #{Line.count} rows in the line table."

User.create(name:"Garen")

Comment.create(body:"This is a test comment", user_id:User.first.id, line_id: Line.first.id)

puts "There are now #{Comment.count} rows in the comment table"