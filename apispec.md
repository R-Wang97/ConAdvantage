Paths
=====

/
/api
	/user
		/create
		/login
		/logout
		/delete <- not sure if we should include this
	/landlord
		/floorplan
			/add
			/delete
			/list
			/show
		/room
			/generate
			/{id}/get
			/{id}/delete
			/list
		/printout
			/room/{id} <- creates a printout of the form you hand to tenant. should include url, qr code, logo and blurb
			/report <- damage report for the rooms
				[blank for all reports]
				/{id}
		/analytics
			[TBD]
	/{id}
		/update
		/submit
/landlord

Todo
====
* landlord should be able to add the following to their printouts
	* logo
	* blurb about what to do
* heatmap may be a good idea for analytics
