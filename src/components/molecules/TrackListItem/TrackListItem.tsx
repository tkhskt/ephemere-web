import {Track} from "types";
import {css} from "@emotion/react";
import {clw} from "util/size";
import {useHover} from "hooks/hover";
import {Colors} from "styles/theme";
import {memo, useLayoutEffect} from "react";
import {HoveredElement, useMouseStalkerContext} from "contexts/MouseStalkerContext/context";

interface TrackListItemProps {
  number: number
  track: Track,
  onClickTrack: (track: Track) => void
}

const TrackItem = css`
  line-height: 1.5em;
`

const TrackNumber = css`
  text-align: right;
`

const TrackName = css`
  padding-left: ${clw(8)};
  //overflow: hidden;
`

const Artist = css`
  padding-left: ${clw(24)};
`

const ArtistLink = css`
  position: relative;
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
`

const ArtistStrokeHover = css`
  width: 100%;
  transition: width 0.2s ease;
`

const Clickable = css`
  cursor: pointer;
`

const TrackListItem = memo((prop: TrackListItemProps) => {
  const {number, track, onClickTrack} = prop

  const [trackHoverRef, isHover] = useHover()

  const [featuredArtistRef, isHoverFeaturedArtist] = useHover()

  const [artistHoverRef, isHoverArtist] = useHover()

  const {setIsHoverOn} = useMouseStalkerContext()

  useLayoutEffect(() => {
    if (isHover && !isHoverFeaturedArtist && track.lyrics) {
      setIsHoverOn(HoveredElement.Track)
    } else if (isHoverArtist || isHoverFeaturedArtist) {
      setIsHoverOn(HoveredElement.Link)
    } else {
      setIsHoverOn(HoveredElement.Others)
    }
  }, [artistHoverRef, isHoverArtist, featuredArtistRef, isHoverFeaturedArtist, trackHoverRef, isHover, isHoverFeaturedArtist, isHoverArtist])

  return (
    <tr key={track.id} css={TrackItem}>
      <td css={TrackNumber}>{number}.</td>
      <td ref={trackHoverRef} css={TrackName}>
        <div css={css`
          display: flex;
          align-items: center;
          padding: .4em 0;
        `}>
          <div><p onClick={() => onClickTrack(track)} css={[css`display: inline`, track.lyrics && Clickable]}>{track.name}</p>
            {
              track.featuredArtist &&
              <p css={css`display: inline`}><span onClick={() => onClickTrack(track)} css={track.lyrics && Clickable}> feat.</span>
                <a css={FeaturedArtistLink} ref={featuredArtistRef} href={track.featuredArtist.url}
                   target='_blank'
                   rel="noreferrer">{track.featuredArtist.name}<span
                  css={[ArtistStroke, isHoverFeaturedArtist && ArtistStrokeHover]}/></a></p>
            }
          </div>
          <div onClick={() => onClickTrack(track)} css={[StrokeContainer, track.lyrics && Clickable]}><span
            css={[Stroke, (isHover && !isHoverFeaturedArtist) && StrokeHover]}/>
          </div>
        </div>
      </td>
      <td css={Artist}><a css={ArtistLink} ref={artistHoverRef} href={track.artist.url} target='_blank'
                          rel="noreferrer">{track.artist.name} <span
        css={[ArtistStroke, isHoverArtist && ArtistStrokeHover]}/></a></td>
    </tr>
  )
})

TrackListItem.displayName = "TrackListItem"

export default TrackListItem
