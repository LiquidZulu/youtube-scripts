with import <nixpkgs> { };
stdenv.mkDerivation {
  name = "art-timelapse";
  buildInputs = [ ffmpeg ];
}
