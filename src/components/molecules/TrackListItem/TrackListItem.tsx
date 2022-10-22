import {Track} from "types";
import {css} from "@emotion/react";
import {clw} from "util/size";
import {useHover} from "hooks/hover";
import {Colors} from "styles/theme";
import {memo, useLayoutEffect} from "react";
import {sp} from "styles/mediaQuert";

interface TrackListItemProps {
  number: number
  track: Track,
  color: string,
  onClickTrack: (track: Track) => void,
  onHoverTrack: () => void,
  onHoverLink: () => void,
  onHoverOthers: () => void,
}

const TrackItem = css`
  line-height: 1.5em;
`

const TrackNumber = css`
  text-align: right;
  ${
    sp(css`
      font-size: 14px;
      padding-top: 15px;
    `)
  }
`

const TrackName = css`
  position: relative;
  padding-left: ${clw(8)};
  ${
    sp(css`
      font-size: 14px;
      padding-top: 15px;

      &:after {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 1px;
        content: '';
        background: linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(235, 235, 235, 0.15), rgba(235, 235, 235, 0.05));
      }
    `)
  }
`

const Artist = css`
  padding-left: ${clw(24)};
  ${
    sp(css`
      padding-top: 15px;
    `)
  }
`

const ArtistLink = css`
  position: relative;
  ${
    sp(css`
      font-size: 12px;
      white-space: nowrap;

      &:after {
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 1px;
        content: '';
        background: ${Colors.White};
      }
    `)
  }
`

const FeaturedArtistLink = css`
  position: relative;
`

const StrokeContainer = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  align-self: stretch;
  overflow: hidden;
  min-width: 0;
`

const Stroke = css`
  position: absolute;
  left: 0;
  top: calc(50% - 0.5px);
  background: linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(235, 235, 235, 0.15), rgba(235, 235, 235, 0.05));
  margin-left: ${clw(24)};
  height: 1px;
  width: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
  will-change: opacity;
  ${
    sp(css`
      display: none;
    `)
  }
`

const StrokeHover = css`
  opacity: 1;
  transition: opacity 0.3s ease;
`

const ArtistStroke = css`
  position: absolute;
  width: 0;
  height: 1px;
  left: 0;
  bottom: 0;
  background: ${Colors.White};
  transition: width 0.2s ease;
  will-change: width;
  ${
    sp(css`
      display: none;
    `)
  }
`

const ArtistStrokeHover = css`
  width: 100%;
  transition: width 0.2s ease;
`

const Clickable = css`
  cursor: pointer;
`

const LyricsSp = css`
  display: none;
  padding-left: 15px;
  padding-top: 15px;
  ${
    sp(css`
      display: table-cell;
      font-size: 10px;
    `)
  }
`

const LyricsSpText = css`
  border: solid 1px;
  border-radius: 25px;
  line-height: 1em;
  padding: 6px 8px;
`

const TrackListItem = memo((prop: TrackListItemProps) => {
  const {number, track, color, onClickTrack, onHoverTrack, onHoverLink, onHoverOthers} = prop

  const [trackHoverRef, isHover] = useHover()

  const [strokeHoverRef, isHoverStroke] = useHover()

  const [featuredArtistRef, isHoverFeaturedArtist] = useHover()

  const [artistHoverRef, isHoverArtist] = useHover()

  useLayoutEffect(() => {
    if ((isHover || isHoverStroke) && !isHoverFeaturedArtist && track.lyrics) {
      onHoverTrack()
    } else if (isHoverArtist || isHoverFeaturedArtist) {
      onHoverLink()
    } else {
      onHoverOthers()
    }
  }, [
    artistHoverRef,
    isHoverArtist,
    featuredArtistRef,
    strokeHoverRef,
    isHoverFeaturedArtist,
    trackHoverRef,
    isHover,
    isHoverFeaturedArtist,
    isHoverArtist,
    isHoverStroke
  ])

  return (
    <tr key={track.id} css={TrackItem}>
      <td css={TrackNumber}>{number}.</td>
      <td css={TrackName}>
        <div css={css`
          display: flex;
          align-items: center;
          padding: .4em 0;
        `}>
          <div ref={trackHoverRef}><p onClick={
            () => {
              if (window.innerWidth > 1024) {
                onClickTrack(track)
              }
            }
          } css={[css`display: inline;
            cursor: default`, track.lyrics && Clickable]}>{track.name}</p>
            {
              track.featuredArtist &&
              <p css={css`display: inline`}><span onClick={() => onClickTrack}
                                                  css={track.lyrics && Clickable}> feat. </span>
                <a css={FeaturedArtistLink} ref={featuredArtistRef} href={track.featuredArtist.url}
                   target='_blank'
                   rel="noreferrer">{track.featuredArtist.name}<span
                  css={[ArtistStroke, isHoverFeaturedArtist && ArtistStrokeHover]}/></a></p>
            }
          </div>
          <div ref={strokeHoverRef} onClick={() => onClickTrack}
               css={[StrokeContainer, track.lyrics && Clickable]}><span
            css={[Stroke, ((isHover || isHoverStroke) && !isHoverFeaturedArtist) && StrokeHover]}/>
          </div>
        </div>
      </td>
      <td css={Artist}><a css={ArtistLink} ref={artistHoverRef} href={track.artist.url} target='_blank'
                          rel="noreferrer">{track.artist.name} <span
        css={[ArtistStroke, isHoverArtist && ArtistStrokeHover]}/></a></td>
      {track.lyrics &&
        <td css={LyricsSp}><p onClick={() => onClickTrack}
                              css={[LyricsSpText, css`border-color: ${color}`]}>Lyrics</p></td>
      }
    </tr>
  )
})

TrackListItem.displayName = "TrackListItem"

export default TrackListItem
