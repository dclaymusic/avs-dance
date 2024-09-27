//TILE-BASED VERSION: divide X and Y by tileW/tileH if needed, then multiply by tileW/tileH at "draw rect" function
    //PIXEL-BASED VERSION: x and y are not divided by tileW/tileH, and "draw rect" function has no tileW/tileH multiplier
    function clickHandler(event) 
    {
        if(!soundInit)
        {
            initSnd();
        }
        else if(!hasStarted && soundInit && allBuffersLoaded)
        { 
            startGame();
        }
        else if(!hasStarted && !allBuffersLoaded && soundInit)
        { }
        else
        {
            const rect = document.getElementById('game').getBoundingClientRect();
            // var x = Math.floor(event.clientX - rect.left) * scale; // divide by a tileW if needed
            // var y = Math.floor(event.clientY - rect.top) * scale; // divide by a tileH if needed
            var x = Math.floor(((event.clientX - rect.left) * scale) / tileW);
            var y = Math.floor(((event.clientY - rect.top) * scale) / tileH);
            // if(x < 0) { x = 0; }
            // if(x > width / tileW) { x = width - tileW; }
            // if(y < 0) { y = 0; }
            // if(y > height / tileW) { y = height - tileH; }
            //console.log(x,y);
            //change bottom row
            if(x >= 0 && x < mapW && y >= 0 && y < mapH)
            {
                gameMap[toIndex(x,y)] = loadedSnd;
                selectSnd('click');
            }
            
        }
    }

    function getHoverOver(event) {
        const rect = document.getElementById('game').getBoundingClientRect();
        // var x = Math.floor(event.clientX - rect.left) * scale;
        // var y = Math.floor(event.clientY - rect.top) * scale;
        var x = Math.floor(((event.clientX - rect.left) * scale) / (tileW));
        var y = Math.floor(((event.clientY - rect.top) * scale) / (tileH));
        // if(x < 0) { x = 0; }
        // if(x > (width / tileW) - 1) { x = (width / tileW) - 1; }
        // if(y < 0) { y = 0; }
        // if(y > (height / tileH) - 1) { y = (height / tileH) - 1; }
        return([x,y]);
    }

    function changeTempo()
    {  
        if(isPlaying) { togglePlay(); }
        if(document.getElementById('tempo').value <= 999)
        {
            tempo = (60/document.getElementById('tempo').value)*1000;
            // clearInterval(timer);
            // if(isPlaying) { timer = setInterval(writeNewRow, tempo); }
        }
        else
        {
            document.getElementById('tempo').value = 999;
            tempo = (60/document.getElementById('tempo').value)*1000;
            // clearInterval(timer);
            // if(isPlaying) { timer = setInterval(writeNewRow, tempo); }
        }

    }

    function drawCursor()
    {
        //draw hover-over shape
        if(mousePos[0] >= 0 && mousePos[0] < mapW && mousePos[1] >= 0 && mousePos[1] < mapH) {  
            document.body.style.cursor = 'pointer';
            if(loadedSnd == 0)
            {
                ctx.fillStyle = "rgba(255,0,0,0.3)";
                ctx.fillRect(mousePos[0]*tileW,mousePos[1]*tileH,tileW,tileH);
            } 
            else
            {
                ctx.globalAlpha = 0.5;
                var tile = tileTypes[loadedSnd];
                ctx.drawImage(tileset, tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h,
                    mousePos[0]*tileW, mousePos[1]*tileH, tileW, tileH);
                ctx.globalAlpha = 1.0;
            }
        }
        else { document.body.style.cursor = 'default'; }
    }

function pickSnd(n)
{
	if(hasStarted)
	{
		for(let i = 1; i <= availableSounds; i++)
		{
			if(i == n)
			{
				if(loadedSnd == i) {
					document.getElementById(`s${i}`).style.border = '2px solid transparent';
					loadedSnd = 0;
				}
				else
				{
					document.getElementById(`s${i}`).style.border = '2px solid red';
					loadedSnd = i;
                    // selectSnd(tileTypes[i].index);
                    selectSnd('click');
				}
			}
			else
			{
				document.getElementById(`s${i}`).style.border = '2px solid transparent';
			}
		}
	}
}
